class LogController < ApplicationController

  # POST /logs.json
  def create
    json = JSON.parse request.body.read

    @student = Student.where(:guid => json["uid"]).first;
    # puts "ROOM IS: #{json["room"]}"
    # @student = "blabla"
    if @student.nil?
      head 401
    else
      @currentattendance = CurrentAttendance.where(:student_id => @student.id).first

      if @currentattendance.nil?
        @currentattendance = CurrentAttendance.new
        @currentattendance.student = @student
        @currentattendance.checkin = Time.now
        if @currentattendance.save!
          head 200
        else
          head 401
        end
      else
        @currentattendance.delete
        if @currentattendance.destroyed?
          head 200
        else
          head 402
        end
      end
    end

  end


end
