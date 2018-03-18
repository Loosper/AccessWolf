class LogController < ApplicationController

  # POST /logs.json
  def create
    json = JSON.parse request.body.read

    @student = Student.where(:guid => json["uid"]).first
    if @student.nil?
      @teacher = Teacher.where(:guid => json["uid"]).first
      if !@teacher.nil? #found teacher
        @pastschedule = PastSchedule.where(:teacher_id => @teacher.id, :over => false).first
        if !@pastschedule.nil?
          @pastschedule.over = true

          find_teacher_sch
          if !@schedule.nil? #if schedule is found -> add it else leave it like that
            @pastschedule.schedule_id = @schedule.id

            mark_missing
          end

          if @pastschedule.save!
            head 200
          else
            head 400
          end
        else #create new PastSchedule
          @pastschedule = PastSchedule.new
          @pastschedule.teacher_id = @teacher.id
          @pastschedule.occurance_date = DateTime.now.to_s
          if @pastschedule.save!
            puts "Wohoo PastSchedule saved"
            head 200
          else
            head 400
          end
        end
      else #didnt find TEACHER
        head 401
      end
    else
      @currentattendance = CurrentAttendance.where(:student_id => @student.id).first

      if @currentattendance.nil? #GETTING IN
        @currentattendance = CurrentAttendance.new
        @currentattendance.student = @student
        @currentattendance.checkin = DateTime.now.to_s(:time)
        @currentattendance.room = json["room"]

        if @currentattendance.save!
          head 200
        else
          head 401
        end
      else #GETTING OUT
        @currentattendance.delete
        if @currentattendance.destroyed?

          @attendance = Attendance.new
          @attendance.date = DateTime.now.to_s
          @attendance.student_id = @student.id
          # @attendance.schedule = find_sch(@currentattendance.checkin, Time.now)
          # @attendance.attended = attended?(@attendance)
          @attended = nil
          find_sch
          if !@schedule.nil? #if u checked wihtout a schedule there u can fak of
            @attendance.schedule_id = @schedule.id
            @attendance.attended = @attended
            if !@attended.nil?
              if @attendance.save!
                head 200
              else
                head 402
              end
            end
          else
            head 300 #u nibba checked w/e u want not that it matters
          end
        else
          head 402
        end
      end
    end
  end

private

  def find_sch
    @schedule = Schedule.where(:room => @currentattendance.room).where("start_time >= ? AND end_time <= ?", @currentattendance.checkin.to_s(:time), DateTime.now.to_s(:time)).first

    if !@schedule.nil?
      @attended = "true"
    else
      @schedule = Schedule.where(:room => @currentattendance.room).where("start_time >= ? AND end_time <= ?", (@currentattendance.checkin - 15.minutes).to_s(:time), DateTime.now.to_s(:time)).first
      if !@schedule.nil?
        @attended = "late"
      end
    end
  end

  def find_teacher_sch
    @schedule = Schedule.where(:room => json["room"]).where("start_time >= ? AND end_time <= ?", @pastschedule.occurance_date.to_s(:time), DateTime.now.to_s(:time)).first
  end

  def mark_missing

    Student.where(:class_id => @schedule.class_id).each do |student|
      if Attendance.where(:student_id => student.id, :schedule_id => @schedule.id).first.nil? #if attendance doesnt excist
        @att = Attendance.new
        @att.schedule_id = @schedule.id
        @att.student_id = student.id
        @att.attended = "false"
        @att.pastschedule = @pastschedule.id
        if @att.save!
          puts "Runner punished."
        else
          puts "U won this time."
        end
      end
    end

  end

end
